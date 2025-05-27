export interface IPv4SubnetValues {
  ipAddress: string;
  subnetMask: string;
  cidrNotation: number;
  networkClass: NetworkClass;
}

export interface IPv6SubnetValues {
  ipAddress: string;
  prefixLength: number;
}

export interface IPv4SubnetResult {
  isValid: boolean;
  error?: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableHost: string;
  lastUsableHost: string;
  numberOfHosts: number;
  numberOfUsableHosts: number;
  subnetMask: string;
  wildcardMask: string;
  cidrNotation: number;
  networkClass: NetworkClass;
  ipType: IPType;
  binarySubnetMask: string;
  binaryNetworkAddress: string;
}

export interface IPv6SubnetResult {
  isValid: boolean;
  error?: string;
  networkAddress: string;
  prefixLength: number;
  numberOfAddresses: string;
  addressType: IPv6AddressType;
  compressedAddress: string;
  expandedAddress: string;
  networkPrefix: string;
  hostIdentifier: string;
}

export interface SubnetValidation {
  isValid: boolean;
  error?: string;
}

export enum NetworkClass {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  ANY = "ANY",
}

export enum IPType {
  PUBLIC = "Public",
  PRIVATE = "Private",
  LOOPBACK = "Loopback",
  MULTICAST = "Multicast",
  RESERVED = "Reserved",
}

export enum IPv6AddressType {
  GLOBAL_UNICAST = "Global Unicast",
  LINK_LOCAL = "Link Local",
  UNIQUE_LOCAL = "Unique Local",
  MULTICAST = "Multicast",
  LOOPBACK = "Loopback",
  UNSPECIFIED = "Unspecified",
}

export interface SubnetMaskOption {
  cidr: number;
  mask: string;
  hosts: number;
}

export interface NetworkClassInfo {
  class: NetworkClass;
  range: string;
  defaultMask: string;
  defaultCIDR: number;
  privateRanges: string[];
}
