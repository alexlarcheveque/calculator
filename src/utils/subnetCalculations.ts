import {
  IPv4SubnetValues,
  IPv6SubnetValues,
  IPv4SubnetResult,
  IPv6SubnetResult,
  SubnetValidation,
  NetworkClass,
  IPType,
  IPv6AddressType,
  SubnetMaskOption,
  NetworkClassInfo,
} from "@/types/subnet";

// Subnet mask options for IPv4
export const SUBNET_MASKS: SubnetMaskOption[] = [
  { cidr: 32, mask: "255.255.255.255", hosts: 0 },
  { cidr: 31, mask: "255.255.255.254", hosts: 0 },
  { cidr: 30, mask: "255.255.255.252", hosts: 2 },
  { cidr: 29, mask: "255.255.255.248", hosts: 6 },
  { cidr: 28, mask: "255.255.255.240", hosts: 14 },
  { cidr: 27, mask: "255.255.255.224", hosts: 30 },
  { cidr: 26, mask: "255.255.255.192", hosts: 62 },
  { cidr: 25, mask: "255.255.255.128", hosts: 126 },
  { cidr: 24, mask: "255.255.255.0", hosts: 254 },
  { cidr: 23, mask: "255.255.254.0", hosts: 510 },
  { cidr: 22, mask: "255.255.252.0", hosts: 1022 },
  { cidr: 21, mask: "255.255.248.0", hosts: 2046 },
  { cidr: 20, mask: "255.255.240.0", hosts: 4094 },
  { cidr: 19, mask: "255.255.224.0", hosts: 8190 },
  { cidr: 18, mask: "255.255.192.0", hosts: 16382 },
  { cidr: 17, mask: "255.255.128.0", hosts: 32766 },
  { cidr: 16, mask: "255.255.0.0", hosts: 65534 },
  { cidr: 15, mask: "255.254.0.0", hosts: 131070 },
  { cidr: 14, mask: "255.252.0.0", hosts: 262142 },
  { cidr: 13, mask: "255.248.0.0", hosts: 524286 },
  { cidr: 12, mask: "255.240.0.0", hosts: 1048574 },
  { cidr: 11, mask: "255.224.0.0", hosts: 2097150 },
  { cidr: 10, mask: "255.192.0.0", hosts: 4194302 },
  { cidr: 9, mask: "255.128.0.0", hosts: 8388606 },
  { cidr: 8, mask: "255.0.0.0", hosts: 16777214 },
  { cidr: 7, mask: "254.0.0.0", hosts: 33554430 },
  { cidr: 6, mask: "252.0.0.0", hosts: 67108862 },
  { cidr: 5, mask: "248.0.0.0", hosts: 134217726 },
  { cidr: 4, mask: "240.0.0.0", hosts: 268435454 },
  { cidr: 3, mask: "224.0.0.0", hosts: 536870910 },
  { cidr: 2, mask: "192.0.0.0", hosts: 1073741822 },
  { cidr: 1, mask: "128.0.0.0", hosts: 2147483646 },
];

// Network class information
export const NETWORK_CLASSES: NetworkClassInfo[] = [
  {
    class: NetworkClass.A,
    range: "1.0.0.0 - 126.255.255.255",
    defaultMask: "255.0.0.0",
    defaultCIDR: 8,
    privateRanges: ["10.0.0.0 - 10.255.255.255"],
  },
  {
    class: NetworkClass.B,
    range: "128.0.0.0 - 191.255.255.255",
    defaultMask: "255.255.0.0",
    defaultCIDR: 16,
    privateRanges: ["172.16.0.0 - 172.31.255.255"],
  },
  {
    class: NetworkClass.C,
    range: "192.0.0.0 - 223.255.255.255",
    defaultMask: "255.255.255.0",
    defaultCIDR: 24,
    privateRanges: ["192.168.0.0 - 192.168.255.255"],
  },
  {
    class: NetworkClass.D,
    range: "224.0.0.0 - 239.255.255.255",
    defaultMask: "N/A (Multicast)",
    defaultCIDR: 0,
    privateRanges: [],
  },
  {
    class: NetworkClass.E,
    range: "240.0.0.0 - 255.255.255.255",
    defaultMask: "N/A (Reserved)",
    defaultCIDR: 0,
    privateRanges: [],
  },
];

// Validate IPv4 address
export function validateIPv4Address(ip: string): SubnetValidation {
  const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = ip.match(ipRegex);

  if (!match) {
    return { isValid: false, error: "Invalid IPv4 address format" };
  }

  const octets = match.slice(1, 5).map(Number);

  for (const octet of octets) {
    if (octet < 0 || octet > 255) {
      return { isValid: false, error: "IPv4 octets must be between 0 and 255" };
    }
  }

  return { isValid: true };
}

// Validate IPv6 address
export function validateIPv6Address(ip: string): SubnetValidation {
  // Remove leading/trailing whitespace
  ip = ip.trim();

  // Check for IPv4-mapped IPv6 addresses
  const ipv4MappedRegex =
    /^::ffff:(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/i;
  if (ipv4MappedRegex.test(ip)) {
    const ipv4Part = ip.split(":").pop();
    if (ipv4Part) {
      return validateIPv4Address(ipv4Part);
    }
  }

  // Basic IPv6 validation
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/;
  const compressedRegex =
    /^([0-9a-fA-F]{0,4}:)*::([0-9a-fA-F]{0,4}:)*[0-9a-fA-F]{0,4}$/;

  if (!ipv6Regex.test(ip) && !compressedRegex.test(ip)) {
    return { isValid: false, error: "Invalid IPv6 address format" };
  }

  // Check for double compression
  const doubleColonCount = (ip.match(/::/g) || []).length;
  if (doubleColonCount > 1) {
    return {
      isValid: false,
      error: "IPv6 address can only have one '::' compression",
    };
  }

  return { isValid: true };
}

// Convert IP address to 32-bit integer
export function ipToInt(ip: string): number {
  const octets = ip.split(".").map(Number);
  return (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3];
}

// Convert 32-bit integer to IP address
export function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join(".");
}

// Convert CIDR to subnet mask
export function cidrToSubnetMask(cidr: number): string {
  const mask = (0xffffffff << (32 - cidr)) >>> 0;
  return intToIp(mask);
}

// Convert subnet mask to CIDR
export function subnetMaskToCidr(mask: string): number {
  const maskInt = ipToInt(mask);
  return 32 - Math.log2((~maskInt >>> 0) + 1);
}

// Get network class from IP address
export function getNetworkClass(ip: string): NetworkClass {
  const firstOctet = parseInt(ip.split(".")[0]);

  if (firstOctet >= 1 && firstOctet <= 126) return NetworkClass.A;
  if (firstOctet >= 128 && firstOctet <= 191) return NetworkClass.B;
  if (firstOctet >= 192 && firstOctet <= 223) return NetworkClass.C;
  if (firstOctet >= 224 && firstOctet <= 239) return NetworkClass.D;
  if (firstOctet >= 240 && firstOctet <= 255) return NetworkClass.E;

  return NetworkClass.ANY;
}

// Determine IP type (public, private, etc.)
export function getIPType(ip: string): IPType {
  const octets = ip.split(".").map(Number);
  const [a, b, c, d] = octets;

  // Loopback
  if (a === 127) return IPType.LOOPBACK;

  // Multicast
  if (a >= 224 && a <= 239) return IPType.MULTICAST;

  // Reserved
  if (a >= 240) return IPType.RESERVED;

  // Private ranges
  if (a === 10) return IPType.PRIVATE;
  if (a === 172 && b >= 16 && b <= 31) return IPType.PRIVATE;
  if (a === 192 && b === 168) return IPType.PRIVATE;

  return IPType.PUBLIC;
}

// Convert IP to binary string
export function ipToBinary(ip: string): string {
  return ip
    .split(".")
    .map((octet) => parseInt(octet).toString(2).padStart(8, "0"))
    .join(".");
}

// Calculate IPv4 subnet information
export function calculateIPv4Subnet(
  values: IPv4SubnetValues
): IPv4SubnetResult {
  // Validate IP address
  const ipValidation = validateIPv4Address(values.ipAddress);
  if (!ipValidation.isValid) {
    return {
      isValid: false,
      error: ipValidation.error,
      networkAddress: "",
      broadcastAddress: "",
      firstUsableHost: "",
      lastUsableHost: "",
      numberOfHosts: 0,
      numberOfUsableHosts: 0,
      subnetMask: "",
      wildcardMask: "",
      cidrNotation: 0,
      networkClass: NetworkClass.ANY,
      ipType: IPType.PUBLIC,
      binarySubnetMask: "",
      binaryNetworkAddress: "",
    };
  }

  // Validate CIDR notation
  if (values.cidrNotation < 0 || values.cidrNotation > 32) {
    return {
      isValid: false,
      error: "CIDR notation must be between 0 and 32",
      networkAddress: "",
      broadcastAddress: "",
      firstUsableHost: "",
      lastUsableHost: "",
      numberOfHosts: 0,
      numberOfUsableHosts: 0,
      subnetMask: "",
      wildcardMask: "",
      cidrNotation: 0,
      networkClass: NetworkClass.ANY,
      ipType: IPType.PUBLIC,
      binarySubnetMask: "",
      binaryNetworkAddress: "",
    };
  }

  const ipInt = ipToInt(values.ipAddress);
  const subnetMask = cidrToSubnetMask(values.cidrNotation);
  const subnetMaskInt = ipToInt(subnetMask);
  const wildcardMaskInt = ~subnetMaskInt >>> 0;
  const wildcardMask = intToIp(wildcardMaskInt);

  const networkInt = ipInt & subnetMaskInt;
  const broadcastInt = networkInt | wildcardMaskInt;

  const networkAddress = intToIp(networkInt);
  const broadcastAddress = intToIp(broadcastInt);

  const numberOfHosts = Math.pow(2, 32 - values.cidrNotation);
  const numberOfUsableHosts = Math.max(0, numberOfHosts - 2);

  const firstUsableHost =
    values.cidrNotation === 32 ? networkAddress : intToIp(networkInt + 1);
  const lastUsableHost =
    values.cidrNotation === 32 ? networkAddress : intToIp(broadcastInt - 1);

  const networkClass = getNetworkClass(values.ipAddress);
  const ipType = getIPType(values.ipAddress);

  return {
    isValid: true,
    networkAddress,
    broadcastAddress,
    firstUsableHost,
    lastUsableHost,
    numberOfHosts,
    numberOfUsableHosts,
    subnetMask,
    wildcardMask,
    cidrNotation: values.cidrNotation,
    networkClass,
    ipType,
    binarySubnetMask: ipToBinary(subnetMask),
    binaryNetworkAddress: ipToBinary(networkAddress),
  };
}

// Expand IPv6 address
export function expandIPv6Address(ip: string): string {
  // Handle IPv4-mapped addresses
  if (ip.includes(".")) {
    const parts = ip.split(":");
    const ipv4Part = parts.pop() || "";
    const ipv6Part = parts.join(":");

    if (ipv4Part.includes(".")) {
      const ipv4Octets = ipv4Part.split(".").map(Number);
      const hex1 = ((ipv4Octets[0] << 8) + ipv4Octets[1])
        .toString(16)
        .padStart(4, "0");
      const hex2 = ((ipv4Octets[2] << 8) + ipv4Octets[3])
        .toString(16)
        .padStart(4, "0");
      ip = ipv6Part + ":" + hex1 + ":" + hex2;
    }
  }

  // Expand :: notation
  if (ip.includes("::")) {
    const parts = ip.split("::");
    const leftParts = parts[0] ? parts[0].split(":") : [];
    const rightParts = parts[1] ? parts[1].split(":") : [];
    const missingParts = 8 - leftParts.length - rightParts.length;

    const expandedParts = [
      ...leftParts,
      ...Array(missingParts).fill("0000"),
      ...rightParts,
    ];

    ip = expandedParts.join(":");
  }

  // Pad each part to 4 characters
  return ip
    .split(":")
    .map((part) => part.padStart(4, "0"))
    .join(":");
}

// Compress IPv6 address
export function compressIPv6Address(ip: string): string {
  const expanded = expandIPv6Address(ip);
  const parts = expanded.split(":");

  // Remove leading zeros
  const trimmedParts = parts.map((part) => part.replace(/^0+/, "") || "0");

  // Find longest sequence of zeros
  let longestZeroStart = -1;
  let longestZeroLength = 0;
  let currentZeroStart = -1;
  let currentZeroLength = 0;

  for (let i = 0; i < trimmedParts.length; i++) {
    if (trimmedParts[i] === "0") {
      if (currentZeroStart === -1) {
        currentZeroStart = i;
        currentZeroLength = 1;
      } else {
        currentZeroLength++;
      }
    } else {
      if (currentZeroLength > longestZeroLength) {
        longestZeroStart = currentZeroStart;
        longestZeroLength = currentZeroLength;
      }
      currentZeroStart = -1;
      currentZeroLength = 0;
    }
  }

  // Check final sequence
  if (currentZeroLength > longestZeroLength) {
    longestZeroStart = currentZeroStart;
    longestZeroLength = currentZeroLength;
  }

  // Replace longest zero sequence with ::
  if (longestZeroLength > 1) {
    const beforeZeros = trimmedParts.slice(0, longestZeroStart);
    const afterZeros = trimmedParts.slice(longestZeroStart + longestZeroLength);

    if (beforeZeros.length === 0 && afterZeros.length === 0) {
      return "::";
    } else if (beforeZeros.length === 0) {
      return "::" + afterZeros.join(":");
    } else if (afterZeros.length === 0) {
      return beforeZeros.join(":") + "::";
    } else {
      return beforeZeros.join(":") + "::" + afterZeros.join(":");
    }
  }

  return trimmedParts.join(":");
}

// Get IPv6 address type
export function getIPv6AddressType(ip: string): IPv6AddressType {
  const expanded = expandIPv6Address(ip);

  // Loopback
  if (expanded === "0000:0000:0000:0000:0000:0000:0000:0001") {
    return IPv6AddressType.LOOPBACK;
  }

  // Unspecified
  if (expanded === "0000:0000:0000:0000:0000:0000:0000:0000") {
    return IPv6AddressType.UNSPECIFIED;
  }

  // Link Local (fe80::/10)
  if (
    expanded.startsWith("fe8") ||
    expanded.startsWith("fe9") ||
    expanded.startsWith("fea") ||
    expanded.startsWith("feb")
  ) {
    return IPv6AddressType.LINK_LOCAL;
  }

  // Unique Local (fc00::/7)
  if (expanded.startsWith("fc") || expanded.startsWith("fd")) {
    return IPv6AddressType.UNIQUE_LOCAL;
  }

  // Multicast (ff00::/8)
  if (expanded.startsWith("ff")) {
    return IPv6AddressType.MULTICAST;
  }

  return IPv6AddressType.GLOBAL_UNICAST;
}

// Calculate IPv6 subnet information
export function calculateIPv6Subnet(
  values: IPv6SubnetValues
): IPv6SubnetResult {
  // Validate IP address
  const ipValidation = validateIPv6Address(values.ipAddress);
  if (!ipValidation.isValid) {
    return {
      isValid: false,
      error: ipValidation.error,
      networkAddress: "",
      prefixLength: 0,
      numberOfAddresses: "",
      addressType: IPv6AddressType.GLOBAL_UNICAST,
      compressedAddress: "",
      expandedAddress: "",
      networkPrefix: "",
      hostIdentifier: "",
    };
  }

  // Validate prefix length
  if (values.prefixLength < 0 || values.prefixLength > 128) {
    return {
      isValid: false,
      error: "Prefix length must be between 0 and 128",
      networkAddress: "",
      prefixLength: 0,
      numberOfAddresses: "",
      addressType: IPv6AddressType.GLOBAL_UNICAST,
      compressedAddress: "",
      expandedAddress: "",
      networkPrefix: "",
      hostIdentifier: "",
    };
  }

  const expandedAddress = expandIPv6Address(values.ipAddress);
  const compressedAddress = compressIPv6Address(values.ipAddress);

  // Calculate network address
  const hexParts = expandedAddress.split(":");
  const binaryAddress = hexParts
    .map((part) => parseInt(part, 16).toString(2).padStart(16, "0"))
    .join("");

  const networkBinary =
    binaryAddress.substring(0, values.prefixLength) +
    "0".repeat(128 - values.prefixLength);

  const networkHex = [];
  for (let i = 0; i < 128; i += 16) {
    const chunk = networkBinary.substring(i, i + 16);
    networkHex.push(parseInt(chunk, 2).toString(16).padStart(4, "0"));
  }

  const networkAddress = compressIPv6Address(networkHex.join(":"));

  // Calculate number of addresses
  const hostBits = 128 - values.prefixLength;
  const numberOfAddresses =
    hostBits <= 63 ? Math.pow(2, hostBits).toLocaleString() : `2^${hostBits}`;

  const addressType = getIPv6AddressType(values.ipAddress);

  // Split into network prefix and host identifier
  const prefixBits = values.prefixLength;
  const networkPrefix = binaryAddress.substring(0, prefixBits);
  const hostIdentifier = binaryAddress.substring(prefixBits);

  return {
    isValid: true,
    networkAddress,
    prefixLength: values.prefixLength,
    numberOfAddresses,
    addressType,
    compressedAddress,
    expandedAddress,
    networkPrefix: networkPrefix + " (" + prefixBits + " bits)",
    hostIdentifier: hostIdentifier + " (" + (128 - prefixBits) + " bits)",
  };
}

// Get subnet masks for a specific network class
export function getSubnetMasksForClass(
  networkClass: NetworkClass
): SubnetMaskOption[] {
  let minCidr = 0;

  switch (networkClass) {
    case NetworkClass.A:
      minCidr = 8;
      break;
    case NetworkClass.B:
      minCidr = 16;
      break;
    case NetworkClass.C:
      minCidr = 24;
      break;
    default:
      minCidr = 0;
  }

  return SUBNET_MASKS.filter((mask) => mask.cidr >= minCidr);
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Get network class info
export function getNetworkClassInfo(
  networkClass: NetworkClass
): NetworkClassInfo | undefined {
  return NETWORK_CLASSES.find((info) => info.class === networkClass);
}
