import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Metrics {    
  @PrimaryGeneratedColumn('uuid')
  id: number | undefined;

  @PrimaryColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  time: Date | undefined;

  @Column('text')
  channel_url: string | undefined;

  @Column('text')
  channel_theme: string | undefined;

  @Column('int')
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
}