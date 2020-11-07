import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date) {
    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    });

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO) {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);;

    return appointment;
  }
}

export default AppointmentsRepository;
