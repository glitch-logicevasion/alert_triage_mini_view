// Alert Triage Mini-View production endpoint sketch.
//
// This file is documentation only. It is not part of a runnable backend project,
// and the current Next.js frontend does not call this endpoint.
//
// Production concerns:
// - Use real authentication and authorization middleware.
// - Enforce tenant-scoped data access in every repository operation.
// - Use parameterized SQL or a safe repository implementation.
// - Validate status values and allowed transitions server-side.
// - Wrap status update and audit history in one transaction.
// - Use optimistic concurrency through ExpectedVersion.
// - Record structured audit logs and operational telemetry.
// - Return structured errors consistently.

using System.Security.Claims;

var app = WebApplication.Create();

app.MapPatch("/api/alerts/{id}/status", async (
    string id,
    UpdateAlertStatusRequest request,
    ClaimsPrincipal user,
    IAlertRepository alerts,
    IAuthorizationService authorization,
    IAuditLogger auditLogger) =>
{
    if (user.Identity?.IsAuthenticated != true)
    {
        return Results.Unauthorized();
    }

    if (string.IsNullOrWhiteSpace(id))
    {
        return Results.BadRequest("Alert id is required.");
    }

    if (request.ExpectedVersion <= 0)
    {
        return Results.BadRequest("ExpectedVersion must be provided.");
    }

    if (!Enum.TryParse<AlertStatus>(request.Status, ignoreCase: true, out var nextStatus))
    {
        return Results.BadRequest("Invalid alert status.");
    }

    // Frontend display labels may map "In Progress" to InProgress and
    // "False Positive" to FalsePositive before calling a real API.
    if (!Enum.IsDefined(nextStatus))
    {
        return Results.BadRequest("Invalid alert status.");
    }

    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
    var tenantId = user.FindFirstValue("tenant_id");

    if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(tenantId))
    {
        return Results.Forbid();
    }

    var alert = await alerts.GetByIdAsync(id, tenantId);

    if (alert is null)
    {
        return Results.NotFound();
    }

    if (!await authorization.CanUpdateAlertStatusAsync(user, alert))
    {
        return Results.Forbid();
    }

    var updateResult = await alerts.UpdateStatusAsync(
        alert.Id,
        tenantId,
        nextStatus,
        request.ExpectedVersion,
        userId,
        request.ChangeReason);

    if (updateResult == AlertStatusUpdateResult.VersionConflict)
    {
        return Results.Conflict("Alert was updated by another user.");
    }

    if (updateResult == AlertStatusUpdateResult.NotFound)
    {
        return Results.NotFound();
    }

    await auditLogger.RecordAlertStatusChangedAsync(
        alert.Id,
        tenantId,
        userId,
        alert.Status,
        nextStatus,
        request.ChangeReason);

    var response = new AlertStatusResponse(
        alert.Id,
        nextStatus.ToString(),
        alert.Version + 1,
        DateTimeOffset.UtcNow);

    return Results.Ok(response);
});

public sealed record UpdateAlertStatusRequest(
    string Status,
    int ExpectedVersion,
    string? ChangeReason);

public sealed record AlertStatusResponse(
    string AlertId,
    string Status,
    int Version,
    DateTimeOffset UpdatedAt);

public enum AlertStatus
{
    Open,
    InProgress,
    Resolved,
    FalsePositive
}

public sealed record AlertRecord(
    string Id,
    string TenantId,
    AlertStatus Status,
    int Version);

public enum AlertStatusUpdateResult
{
    Updated,
    NotFound,
    VersionConflict
}

public interface IAlertRepository
{
    Task<AlertRecord?> GetByIdAsync(string alertId, string tenantId);

    Task<AlertStatusUpdateResult> UpdateStatusAsync(
        string alertId,
        string tenantId,
        AlertStatus nextStatus,
        int expectedVersion,
        string changedBy,
        string? changeReason);
}

public interface IAuthorizationService
{
    Task<bool> CanUpdateAlertStatusAsync(ClaimsPrincipal user, AlertRecord alert);
}

public interface IAuditLogger
{
    Task RecordAlertStatusChangedAsync(
        string alertId,
        string tenantId,
        string changedBy,
        AlertStatus previousStatus,
        AlertStatus nextStatus,
        string? changeReason);
}
