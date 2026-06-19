export function formatRelativeTime(isoTimestamp: string, now = new Date()) {
  const createdAt = new Date(isoTimestamp);

  if (Number.isNaN(createdAt.getTime())) {
    return "Unknown";
  }

  const diffMs = Math.max(0, now.getTime() - createdAt.getTime());
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 1) {
    return "now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);

  return `${diffDays}d ago`;
}

export function formatFullTimestamp(isoTimestamp: string) {
  const createdAt = new Date(isoTimestamp);

  if (Number.isNaN(createdAt.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(createdAt);
}
