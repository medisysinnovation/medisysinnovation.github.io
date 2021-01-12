export default interface ContainerYardSummaryDto {
  totalContainers: number;
  inspectedContainers: number;
  pendingInspectionContainers: number;
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
}
