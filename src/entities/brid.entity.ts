import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brid {
  @PrimaryGeneratedColumn() // 自动生成id
  id: number;

  /**
   * 电池电压
   */
  @Column()
  batteryVcc: string;

  /**
   * 工作状态
   */
  @Column()
  workStatus: string;

  /**
   * 是否播放声音
   */
  @Column()
  playSound: string;

  /**
   * 红外检测是否开启
   */
  @Column()
  Ir: string;

  /**
   * 经度
   */
  @Column()
  longitude: string;

  /**
   * 维度
   */
  @Column()
  latitude: string;

  /**
   * 驱鸟次数
   */
  @Column()
  counter: number;
}
