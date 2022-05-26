import {
  BaseEntity, Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, Unique, UpdateDateColumn
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

@Entity()
@Unique(['userNumber'])
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
  @Generated('increment')
    userNumber: number

  @Column()
    email: string

  @Column()
    firstName: string

  @Column()
    lastName: string

  @Exclude()
  @Column()
    password: string

  // @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
    createdAt?: Date

  // @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @UpdateDateColumn({ type: 'timestamptz', default: 'now()' })
    modifiedAt?: Date

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
