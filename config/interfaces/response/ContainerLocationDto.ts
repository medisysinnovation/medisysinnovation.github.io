import ContainerMonitoringDto from './ContainerMonitoringDto';

export default interface ContainerLocationDto {
  id: string;
  containerYardId: string;
  containerMonitoringId: string;
  containerMonitoring: ContainerMonitoringDto;
}
