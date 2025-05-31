"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-is-subnetting-basics",
    question:
      "What is subnetting and why is it important for network management?",
    answer: (
      <>
        <p className="mb-2">
          Subnetting is the process of dividing a larger IP network into
          smaller, more manageable subnetworks (subnets). This creates efficient
          network organization and enhanced security through logical
          segmentation.
        </p>
        <p className="mb-2">
          <strong>Key benefits of subnetting:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Improved performance:</strong> Reduces broadcast traffic by
            limiting broadcast domains
          </li>
          <li>
            <strong>Enhanced security:</strong> Isolates different network
            segments from each other
          </li>
          <li>
            <strong>Efficient IP usage:</strong> Allocates IP addresses based on
            actual host requirements
          </li>
          <li>
            <strong>Simplified management:</strong> Organizes network into
            logical groups by function
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Company network 192.168.1.0/24 (254 hosts) divided into:</li>
          <li>HR Department: 192.168.1.0/27 (30 hosts)</li>
          <li>IT Department: 192.168.1.32/27 (30 hosts)</li>
          <li>Guest Network: 192.168.1.64/27 (30 hosts)</li>
          <li>Servers: 192.168.1.96/27 (30 hosts)</li>
        </ul>
      </>
    ),
  },
  {
    id: "cidr-notation-explanation",
    question:
      "How does CIDR notation work and what do the numbers after the slash mean?",
    answer: (
      <>
        <p className="mb-2">
          CIDR (Classless Inter-Domain Routing) notation uses a slash followed
          by a number to indicate how many bits represent the network portion of
          an IP address.
        </p>
        <p className="mb-2">
          <strong>CIDR notation breakdown:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>/24 means:</strong> First 24 bits identify the network, last
            8 bits for hosts
          </li>
          <li>
            <strong>Subnet mask equivalent:</strong> /24 = 255.255.255.0
          </li>
          <li>
            <strong>Available hosts:</strong> 2^8 - 2 = 254 usable host
            addresses
          </li>
          <li>
            <strong>Network address:</strong> All host bits set to 0
          </li>
          <li>
            <strong>Broadcast address:</strong> All host bits set to 1
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common CIDR examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>/8 (255.0.0.0):</strong> 16,777,214 hosts - Class A networks
          </li>
          <li>
            <strong>/16 (255.255.0.0):</strong> 65,534 hosts - Class B networks
          </li>
          <li>
            <strong>/24 (255.255.255.0):</strong> 254 hosts - Class C networks
          </li>
          <li>
            <strong>/30 (255.255.255.252):</strong> 2 hosts - Point-to-point
            links
          </li>
        </ul>
        <p className="text-sm">
          <strong>Memory tip:</strong> Higher CIDR numbers = smaller subnets
          with fewer hosts.
        </p>
      </>
    ),
  },
  {
    id: "ip-address-classes-explained",
    question:
      "What are the different IP address classes and their characteristics?",
    answer: (
      <>
        <p className="mb-2">
          IP address classes were the original method of organizing IPv4
          addresses before CIDR became standard, but understanding them remains
          important for network design.
        </p>
        <p className="mb-2">
          <strong>Class A networks (1.0.0.0 - 126.255.255.255):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Default mask: 255.0.0.0 (/8)</li>
          <li>16,777,214 hosts per network</li>
          <li>Private range: 10.0.0.0 - 10.255.255.255</li>
          <li>Used by: Large corporations, ISPs</li>
        </ul>
        <p className="mb-2">
          <strong>Class B networks (128.0.0.0 - 191.255.255.255):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Default mask: 255.255.0.0 (/16)</li>
          <li>65,534 hosts per network</li>
          <li>Private range: 172.16.0.0 - 172.31.255.255</li>
          <li>Used by: Medium to large organizations</li>
        </ul>
        <p className="mb-2">
          <strong>Class C networks (192.0.0.0 - 223.255.255.255):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Default mask: 255.255.255.0 (/24)</li>
          <li>254 hosts per network</li>
          <li>Private range: 192.168.0.0 - 192.168.255.255</li>
          <li>Used by: Small offices, home networks</li>
        </ul>
        <p className="text-sm">
          <strong>Special addresses:</strong> Class D (224-239) for multicast,
          Class E (240-255) reserved for experimental use.
        </p>
      </>
    ),
  },
  {
    id: "subnet-mask-calculation",
    question:
      "How do I calculate subnet masks and determine network boundaries?",
    answer: (
      <>
        <p className="mb-2">
          Subnet masks determine which portion of an IP address represents the
          network and which represents the host. Understanding binary conversion
          is key to subnet calculations.
        </p>
        <p className="mb-2">
          <strong>Subnet mask calculation process:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Step 1:</strong> Determine required number of subnets and
            hosts
          </li>
          <li>
            <strong>Step 2:</strong> Calculate bits needed (2^n ≥ required
            number)
          </li>
          <li>
            <strong>Step 3:</strong> Apply borrowed bits to create subnet mask
          </li>
          <li>
            <strong>Step 4:</strong> Calculate network boundaries using subnet
            mask
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example: Divide 192.168.1.0/24 into 4 subnets:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Need 4 subnets: 2^2 = 4, so borrow 2 bits</li>
          <li>New mask: /26 (255.255.255.192)</li>
          <li>Subnet 1: 192.168.1.0/26 (hosts 1-62)</li>
          <li>Subnet 2: 192.168.1.64/26 (hosts 65-126)</li>
          <li>Subnet 3: 192.168.1.128/26 (hosts 129-190)</li>
          <li>Subnet 4: 192.168.1.192/26 (hosts 193-254)</li>
        </ul>
        <p className="text-sm">
          <strong>Key formula:</strong> Usable hosts = 2^(host bits) - 2
          (subtract network and broadcast addresses).
        </p>
      </>
    ),
  },
  {
    id: "vlsm-variable-length-subnetting",
    question: "What is VLSM and how does it improve IP address efficiency?",
    answer: (
      <>
        <p className="mb-2">
          VLSM (Variable Length Subnet Masking) allows different subnet sizes
          within the same network, maximizing IP address efficiency by
          allocating exactly what each subnet needs.
        </p>
        <p className="mb-2">
          <strong>VLSM design principles:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Size subnets appropriately:</strong> Allocate based on
            actual host requirements
          </li>
          <li>
            <strong>Start with largest:</strong> Create largest subnets first to
            avoid fragmentation
          </li>
          <li>
            <strong>Document carefully:</strong> Track all subnet allocations to
            prevent overlap
          </li>
          <li>
            <strong>Plan for growth:</strong> Leave room for future expansion
          </li>
        </ul>
        <p className="mb-2">
          <strong>VLSM example with 192.168.1.0/24:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Sales (100 users):</strong> 192.168.1.0/25 (126 hosts)
          </li>
          <li>
            <strong>Engineering (50 users):</strong> 192.168.1.128/26 (62 hosts)
          </li>
          <li>
            <strong>HR (10 users):</strong> 192.168.1.192/28 (14 hosts)
          </li>
          <li>
            <strong>Point-to-point links:</strong> 192.168.1.208/30,
            192.168.1.212/30 (2 hosts each)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Efficiency gain:</strong> VLSM prevents wasting addresses
          compared to fixed-length subnetting.
        </p>
      </>
    ),
  },
  {
    id: "ipv6-addressing-fundamentals",
    question:
      "How does IPv6 addressing work and what are the main address types?",
    answer: (
      <>
        <p className="mb-2">
          IPv6 uses 128-bit addresses (vs IPv4's 32-bit) providing 340
          undecillion addresses, eliminating address scarcity and simplifying
          network configuration.
        </p>
        <p className="mb-2">
          <strong>IPv6 address format:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Hexadecimal notation:</strong> 8 groups of 4 hex digits
            separated by colons
          </li>
          <li>
            <strong>Example:</strong> 2001:0db8:85a3:0000:0000:8a2e:0370:7334
          </li>
          <li>
            <strong>Compression:</strong> ::1 represents loopback (equivalent to
            127.0.0.1)
          </li>
          <li>
            <strong>Prefix notation:</strong> 2001:db8::/32 (first 32 bits are
            network)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Main IPv6 address types:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Global Unicast (2000::/3):</strong> Globally routable, like
            IPv4 public addresses
          </li>
          <li>
            <strong>Link-Local (fe80::/10):</strong> Local segment only,
            auto-configured
          </li>
          <li>
            <strong>Unique Local (fc00::/7):</strong> Private addresses, like
            IPv4 RFC 1918
          </li>
          <li>
            <strong>Multicast (ff00::/8):</strong> One-to-many communication
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key advantage:</strong> IPv6 eliminates NAT requirements and
          enables end-to-end connectivity.
        </p>
      </>
    ),
  },
  {
    id: "private-vs-public-ip-addresses",
    question: "What's the difference between private and public IP addresses?",
    answer: (
      <>
        <p className="mb-2">
          Private IP addresses are used within internal networks and cannot be
          routed on the Internet, while public IP addresses are globally unique
          and Internet-routable.
        </p>
        <p className="mb-2">
          <strong>Private IP address ranges (RFC 1918):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Class A:</strong> 10.0.0.0 to 10.255.255.255 (10.0.0.0/8)
          </li>
          <li>
            <strong>Class B:</strong> 172.16.0.0 to 172.31.255.255
            (172.16.0.0/12)
          </li>
          <li>
            <strong>Class C:</strong> 192.168.0.0 to 192.168.255.255
            (192.168.0.0/16)
          </li>
          <li>
            <strong>Link-Local:</strong> 169.254.0.0 to 169.254.255.255
            (auto-assigned)
          </li>
        </ul>
        <p className="mb-2">
          <strong>How NAT enables private-to-public communication:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Outbound:</strong> Router translates private IP to public IP
          </li>
          <li>
            <strong>Inbound:</strong> Router maps returning traffic back to
            private IP
          </li>
          <li>
            <strong>Port mapping:</strong> Multiple private IPs share one public
            IP using different ports
          </li>
        </ul>
        <p className="mb-2">
          <strong>Benefits of private addressing:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Conserves public IP addresses</li>
          <li>Provides additional security layer</li>
          <li>Allows identical addressing schemes across organizations</li>
          <li>Enables flexible internal network design</li>
        </ul>
      </>
    ),
  },
  {
    id: "broadcast-network-addresses",
    question:
      "What are network and broadcast addresses and why can't they be assigned to hosts?",
    answer: (
      <>
        <p className="mb-2">
          Network and broadcast addresses serve special functions in IP
          networking and cannot be assigned to individual devices, reducing the
          total usable host addresses by 2.
        </p>
        <p className="mb-2">
          <strong>Network address characteristics:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Definition:</strong> All host bits set to 0 (binary)
          </li>
          <li>
            <strong>Purpose:</strong> Identifies the network itself in routing
            tables
          </li>
          <li>
            <strong>Example:</strong> Network 192.168.1.0/24 has network address
            192.168.1.0
          </li>
          <li>
            <strong>Usage:</strong> Referenced in router configurations and
            routing protocols
          </li>
        </ul>
        <p className="mb-2">
          <strong>Broadcast address characteristics:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Definition:</strong> All host bits set to 1 (binary)
          </li>
          <li>
            <strong>Purpose:</strong> Sends packets to all hosts in the subnet
          </li>
          <li>
            <strong>Example:</strong> Network 192.168.1.0/24 has broadcast
            address 192.168.1.255
          </li>
          <li>
            <strong>Usage:</strong> DHCP discovery, ARP requests, network
            announcements
          </li>
        </ul>
        <p className="mb-2">
          <strong>Practical subnet example (192.168.1.0/26):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Network address: 192.168.1.0 (unusable for hosts)</li>
          <li>First usable host: 192.168.1.1</li>
          <li>Last usable host: 192.168.1.62</li>
          <li>Broadcast address: 192.168.1.63 (unusable for hosts)</li>
          <li>Total usable addresses: 62 (64 - 2)</li>
        </ul>
      </>
    ),
  },
  {
    id: "subnetting-best-practices",
    question:
      "What are the best practices for planning and implementing subnets?",
    answer: (
      <>
        <p className="mb-2">
          Proper subnet planning prevents future network issues and ensures
          efficient IP address utilization while supporting organizational
          growth and security requirements.
        </p>
        <p className="mb-2">
          <strong>Planning phase best practices:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Document requirements:</strong> Current and projected host
            counts per department
          </li>
          <li>
            <strong>Apply 20% growth rule:</strong> Plan for 20% more hosts than
            currently needed
          </li>
          <li>
            <strong>Consider VLAN alignment:</strong> Match subnets to broadcast
            domains
          </li>
          <li>
            <strong>Plan hierarchically:</strong> Use geographical or functional
            organization
          </li>
        </ul>
        <p className="mb-2">
          <strong>Implementation best practices:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Consistent addressing:</strong> Use predictable IP ranges
            (e.g., .1 for gateways)
          </li>
          <li>
            <strong>Document everything:</strong> Maintain accurate subnet
            assignment records
          </li>
          <li>
            <strong>Test thoroughly:</strong> Verify connectivity between
            subnets
          </li>
          <li>
            <strong>Monitor utilization:</strong> Track IP address usage to plan
            expansions
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common subnet sizing guidelines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>/30 (2 hosts): Point-to-point links, WAN connections</li>
          <li>/28 (14 hosts): Small workgroups, printer networks</li>
          <li>/27 (30 hosts): Small departments, conference rooms</li>
          <li>/26 (62 hosts): Medium departments, wireless networks</li>
          <li>/25 (126 hosts): Large departments, server farms</li>
          <li>/24 (254 hosts): Traditional LAN segments</li>
        </ul>
      </>
    ),
  },
  {
    id: "subnet-calculator-features",
    question:
      "What features should I look for in a subnet calculator and how do I interpret results?",
    answer: (
      <>
        <p className="mb-2">
          A comprehensive subnet calculator should provide detailed network
          information, support both IPv4 and IPv6, and help with network
          planning and troubleshooting.
        </p>
        <p className="mb-2">
          <strong>Essential calculator features:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Multiple input formats:</strong> CIDR notation, decimal
            masks, binary conversion
          </li>
          <li>
            <strong>Comprehensive output:</strong> Network/broadcast addresses,
            host ranges, binary representation
          </li>
          <li>
            <strong>Subnet division:</strong> Split networks into smaller
            subnets with custom sizing
          </li>
          <li>
            <strong>IPv6 support:</strong> Handle 128-bit addresses and prefix
            calculations
          </li>
        </ul>
        <p className="mb-2">
          <strong>Key calculator outputs to understand:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Network address:</strong> Base address identifying the
            subnet
          </li>
          <li>
            <strong>Broadcast address:</strong> Last address in the subnet range
          </li>
          <li>
            <strong>Host range:</strong> First to last usable addresses for
            devices
          </li>
          <li>
            <strong>Wildcard mask:</strong> Inverse of subnet mask for ACL
            configuration
          </li>
        </ul>
        <p className="mb-2">
          <strong>Advanced features for network engineers:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>VLSM calculations for efficient address allocation</li>
          <li>Supernetting for route summarization</li>
          <li>Binary/hexadecimal representation for troubleshooting</li>
          <li>Integration with network design tools and documentation</li>
        </ul>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Subnet calculations are based on standard IPv4 and IPv6 addressing
      principles. Always verify network configurations in a test environment
      before implementing in production networks. Consider security policies,
      routing requirements, and organizational standards when designing subnet
      schemes.
    </p>
  </>
);

export default function FAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About IP Subnetting"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="subnet-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/percentage", label: "Percentage Calculator" },
        { href: "/time", label: "Time Calculator" },
        { href: "/concrete", label: "Concrete Calculator" },
        { href: "/grade", label: "Grade Calculator" },
      ]}
    />
  );
}
