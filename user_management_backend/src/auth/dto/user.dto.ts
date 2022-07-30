export interface UserDto {
  login: string;
  userName?: string;
  avatarUrl?: string;
  changedAvatar?: boolean;
  twoFactorAuth?: boolean;
}
