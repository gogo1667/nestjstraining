import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsNotEmpty, IsIn, IsEnum } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  // @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
   @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
