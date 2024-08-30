import { IsDateString, IsString, Matches } from 'class-validator'

export class CreateAppointmentDto {
	@IsDateString()
	date: string

	@IsString()
	@Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
		message: 'Time must be in HH:MM format',
	})
	time: string
}
