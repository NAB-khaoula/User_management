export interface UserDto {
  login: string;
  email?: string;
  userName?: string;
  avatar?: string;
  changedAvatar?: boolean;
  isTwoFactorAuthEnabled?: boolean;
  isTwoFactorAuthenticated?: boolean;
  twoFactorAuthenticationSecret?: string;
}
