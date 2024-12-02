import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Metrics } from './Metrics';

@Entity()
export class Channel {    
  @PrimaryGeneratedColumn('uuid')
  id: number | undefined;

  @Column('text')
  name: string | undefined;

  @Column('text')
  domain: string | undefined;

  @Column('text', { unique: true })
  internal_link: string | undefined;

  @Column('text')
  theme: string | undefined;

  @Column('bool')
  is_reference: boolean | undefined;

  @OneToMany(() => Metrics, (metric) => metric.channel)
  metrics: Metrics[] | undefined;
}