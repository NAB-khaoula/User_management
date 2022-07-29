export interface UserDto {
  login: string;
  userName?: string;
  avatarUrl?: string;
  removedAvatar?: boolean;
  twoFactorAuth?: boolean;
}
