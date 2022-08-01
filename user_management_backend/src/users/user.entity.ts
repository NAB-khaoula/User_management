import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  avatar: string;

  @Column()
  changedAvatar: boolean;

  @Column()
  isTwoFactorAuthEnabled: boolean;

  @Column()
  isTwoFactorAuthenticated: boolean;

  @Column()
  twoFactorAuthenticationSecret: string;
}
