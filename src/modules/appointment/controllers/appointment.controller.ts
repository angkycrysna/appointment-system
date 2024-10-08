import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, HttpCode, Delete } from '@nestjs/common'
import { AppointmentService } from '../services/appointment.service'
import { CreateAppointmentDto } from 'src/dtos/appointments/create-appointment.dto'

@Controller('appointments')
export class AppointmentController {
	constructor(private readonly appointmentService: AppointmentService) {}

	@Get('available-slots/:date')
	async getAvailableSlots(@Param('date') date: string) {
		return this.appointmentService.getAvailableSlots(date)
	}

	@Post()
	async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
		try {
			return await this.appointmentService.createAppointment(createAppointmentDto)
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async cancelAppointment(@Param('id') id: string) {
		await this.appointmentService.cancelAppointment(parseInt(id, 10));
	}
}
