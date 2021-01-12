import ContainerYardDto from './ContainerYardDto';

export default interface ContainerYardResultDto {
  containerYards: ContainerYardDto[];
  maxRows: number;
  maxColumns: number;
}
