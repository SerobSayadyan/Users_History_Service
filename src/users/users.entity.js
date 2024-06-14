import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column({type: 'varchar'})
  name;

  @Column({type: 'varchar'})
  email;
}

export default User;