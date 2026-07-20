import { SalonDetails } from "@/types/salon";
import { style1, style2, style3, style4, style5, style6, style7, style8 } from './styles'
import Model01 from "./Model01";
interface BasicModelProps {
  salon: SalonDetails;
  template_id: string;
}

const stylesMap: Record<string, string> = {
  "1": style1,
  "2": style2,
  "3": style3,
  "4": style4,
  "5": style5,
  "6": style6,
  "7": style7,
  "8": style8,
};

export default function BasicModel({
  salon,
  template_id,
}: BasicModelProps) {
  const id = (template_id in stylesMap ? template_id : "1") as keyof typeof stylesMap;
  return <Model01 salon={salon} styles={stylesMap[id]} />;
}