import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMetricsTable1732044260612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'metrics',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isNullable: false,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'channel_url',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'channel_theme',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'score',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'responseTime',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'fcp',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'si',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'lcp',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'tbt',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'cls',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'time',
                        type: 'timestamp with time zone',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
                indices: [
                    {
                        columnNames: ['id', 'time'],
                        isUnique: true
                    }
                ]
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('metrics')
    }

}
