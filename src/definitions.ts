import type { PluginListenerHandle } from "@capacitor/core";

/** A signed-in player's public profile. */
export interface PlayerInfo {
  /** Stable, platform-assigned player id (PGS player id / GameKit `gamePlayerID`). */
  playerId: string;
  /** Display name as shown in Google Play Games / Game Center. */
  displayName: string;
  /** URL of the player's avatar image, when the platform exposes one. */
  avatarUrl?: string;
}

/** Result of a sign-in attempt, or the payload of a sign-in state change. */
export interface SignInResult {
  /** Whether the player is currently authenticated. */
  signedIn: boolean;
  /** The player profile, present only when `signedIn` is true. */
  player?: PlayerInfo;
}

/** A saved-game snapshot together with its serialized payload. */
export interface Snapshot {
  /** Stable unique name the snapshot was saved under. */
  name: string;
  /** Human-readable description stored with the snapshot. */
  description: string;
  /** Last-modified time, in epoch milliseconds. */
  modifiedAt: number;
  /** The serialized save payload as a UTF-8 string (encode binary yourself). */
  data: string;
}

/** Snapshot metadata without the payload, as returned by `listSnapshots`. */
export interface SnapshotMeta {
  /** Stable unique name of the snapshot. */
  name: string;
  /** Human-readable description stored with the snapshot. */
  description: string;
  /** Last-modified time, in epoch milliseconds. */
  modifiedAt: number;
}

/** Payload of the `signInStateChanged` event. */
export type SignInStateChangedEvent = SignInResult;

export interface PlayGamesPlugin {
  /**
   * Initialize the native games SDK. Idempotent.
   *
   * On Android this triggers `PlayGamesSdk.initialize`; on iOS it installs the
   * GameKit authentication handler. Call once, after any App Tracking
   * Transparency prompt has resolved, before the other methods.
   *
   * @since 0.1.0
   */
  initialize(): Promise<void>;

  /**
   * Sign in to the platform games service.
   *
   * `silent` (default `true`) attempts auto sign-in with no UI; on most devices
   * this succeeds if the player has previously authenticated this game. Pass
   * `silent: false` to force the full interactive flow, and only in response to
   * an explicit user gesture.
   *
   * @since 0.1.0
   */
  signIn(opts?: { silent?: boolean }): Promise<SignInResult>;

  /**
   * Whether a player is currently signed in.
   * @since 0.1.0
   */
  isSignedIn(): Promise<{ signedIn: boolean }>;

  /**
   * Get the signed-in player's profile.
   *
   * On Android and iOS this rejects when no player is signed in. On web (the
   * no-op fallback) it resolves an empty profile (`playerId: ""`).
   * @since 0.1.0
   */
  getPlayer(): Promise<PlayerInfo>;

  /**
   * Unlock an achievement by its platform id (Play Console achievement id on
   * Android, App Store Connect / Game Center id on iOS).
   * @since 0.1.0
   */
  unlockAchievement(opts: { id: string }): Promise<void>;

  /**
   * Increment a partial (incremental) achievement.
   *
   * `steps` is interpreted differently per platform: on Android (PGS) it is a
   * discrete step count toward the achievement's Play Console step total; on
   * iOS (GameKit) it is added to `percentComplete` as percentage points.
   * Compute a platform-appropriate value (e.g. via `Capacitor.getPlatform()`)
   * so progress matches on both stores.
   * @since 0.1.0
   */
  incrementAchievement(opts: { id: string; steps: number }): Promise<void>;

  /**
   * Show the platform's native achievements UI.
   * @since 0.1.0
   */
  showAchievements(): Promise<void>;

  /**
   * Submit a score to a leaderboard by its platform id.
   * @since 0.1.0
   */
  submitScore(opts: { leaderboardId: string; score: number }): Promise<void>;

  /**
   * Show the native UI for a single leaderboard.
   * @since 0.1.0
   */
  showLeaderboard(opts: { leaderboardId: string }): Promise<void>;

  /**
   * Show the native all-leaderboards UI.
   * @since 0.1.0
   */
  showAllLeaderboards(): Promise<void>;

  /**
   * Load a saved-game snapshot by its stable name. Resolves `{ snapshot: null }`
   * when no snapshot exists for that name.
   * @since 0.1.0
   */
  loadSnapshot(opts: { name: string }): Promise<{ snapshot: Snapshot | null }>;

  /**
   * Create or overwrite a saved-game snapshot. Conflicts are auto-resolved by
   * most-recently-modified (last write wins), with no merge.
   * @since 0.1.0
   */
  saveSnapshot(opts: { name: string; data: string; description?: string }): Promise<void>;

  /**
   * List metadata for all of the player's snapshots.
   * @since 0.1.0
   */
  listSnapshots(): Promise<{ snapshots: SnapshotMeta[] }>;

  /**
   * Delete a saved-game snapshot by its stable name.
   * @since 0.1.0
   */
  deleteSnapshot(opts: { name: string }): Promise<void>;

  /**
   * Listen for sign-in state changes: an interactive sign-in completing, or the
   * player signing out of the platform service system-wide.
   * @since 0.1.0
   */
  addListener(
    event: "signInStateChanged",
    listener: (e: SignInStateChangedEvent) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Remove all listeners registered through this plugin.
   * @since 0.1.0
   */
  removeAllListeners(): Promise<void>;
}
