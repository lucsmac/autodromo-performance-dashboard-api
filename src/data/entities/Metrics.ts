import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Channel } from './Channel';

@Entity()
export class Metrics {    
  @PrimaryGeneratedColumn('uuid')
  id: number | undefined;

  @PrimaryColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  time: Date | undefined;

  @Column('float')
  score: number | undefined;

  @Column('int')
  responseTime: number | undefined;

  @Column('float')
  fcp: number | undefined;

  @Column('float')
  si: number | undefined;

  @Column('float')
  lcp: number | undefined;

  @Column('float')
  tbt: number | undefined;

  @Column('float')
  cls: number | undefined;

  @Column({ nullable: false })
  channel_id: string | undefined;

  @ManyToOne(() => Channel, (channel: Channel) => channel.metrics)
  @JoinColumn({ name: 'channel_id' })
  channel: Channel | undefined;
}