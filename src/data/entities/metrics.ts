import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Channel } from './channel';

@Entity()
export class Metrics {    
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @PrimaryColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  time!: Date;

  @Column('float')
  score!: number;

  @Column('int')
  responseTime!: number;

  @Column('float')
  fcp!: number;

  @Column('float')
  si!: number;

  @Column('float')
  lcp!: number;

  @Column('float')
  tbt!: number;

  @Column('float')
  cls!: number;

  @Column({ nullable: false })
  channel_id!: string;

  @ManyToOne(() => Channel, (channel: Channel) => channel.metrics)
  @JoinColumn({ name: 'channel_id' })
  channel!: Channel;
}