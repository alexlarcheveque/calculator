export default function SubnetEducation() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        About IP Subnetting and Network Addressing
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            What is Subnetting?
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              A subnet is a division of an IP network (internet protocol suite),
              where an IP network is a set of communications protocols used on
              the Internet and other similar networks. It is commonly known as
              TCP/IP (Transmission Control Protocol/Internet Protocol).
            </p>
            <p>
              The act of dividing a network into at least two separate networks
              is called subnetting, and routers are devices that allow traffic
              exchange between subnetworks, serving as a physical boundary. IPv4
              is the most common network addressing architecture used, though
              the use of IPv6 has been growing since 2006.
            </p>
            <p>
              An IP address is comprised of a network number (routing prefix)
              and a rest field (host identifier). A rest field is an identifier
              that is specific to a given host or network interface. A routing
              prefix is often expressed using Classless Inter-Domain Routing
              (CIDR) notation for both IPv4 and IPv6.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            CIDR and Network Classes
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              CIDR is a method used to create unique identifiers for networks,
              as well as individual devices. For IPv4, networks can also be
              characterized using a subnet mask, which is sometimes expressed in
              dot-decimal notation. All hosts on a subnetwork have the same
              network prefix, unlike the host identifier, which is a unique
              local identification.
            </p>
            <p>
              Prior to the introduction of CIDR, IPv4 network prefixes could be
              directly obtained from the IP address based on the class (A, B, or
              C, which vary based on the range of IP addresses they include) of
              the address and the network mask. Since the introduction of CIDRs,
              however, assigning an IP address to a network interface requires
              both an address and its network mask.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                Network Classes Overview
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Class A:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Range: 1.0.0.0 - 126.255.255.255</li>
                    <li>Default Mask: 255.0.0.0 (/8)</li>
                    <li>Private: 10.0.0.0 - 10.255.255.255</li>
                    <li>Hosts: 16,777,214</li>
                  </ul>
                </div>
                <div>
                  <strong>Class B:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Range: 128.0.0.0 - 191.255.255.255</li>
                    <li>Default Mask: 255.255.0.0 (/16)</li>
                    <li>Private: 172.16.0.0 - 172.31.255.255</li>
                    <li>Hosts: 65,534</li>
                  </ul>
                </div>
                <div>
                  <strong>Class C:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Range: 192.0.0.0 - 223.255.255.255</li>
                    <li>Default Mask: 255.255.255.0 (/24)</li>
                    <li>Private: 192.168.0.0 - 192.168.255.255</li>
                    <li>Hosts: 254</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            IPv4 Subnet Reference Table
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Below is a table providing typical subnets for IPv4, showing the
              relationship between prefix size, network mask, and the number of
              usable hosts per subnet.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Prefix Size
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Network Mask
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Usable Hosts per Subnet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/1</td>
                    <td className="border border-gray-300 px-4 py-2">
                      128.0.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      2,147,483,646
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/2</td>
                    <td className="border border-gray-300 px-4 py-2">
                      192.0.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      1,073,741,822
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/3</td>
                    <td className="border border-gray-300 px-4 py-2">
                      224.0.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      536,870,910
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/4</td>
                    <td className="border border-gray-300 px-4 py-2">
                      240.0.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      268,435,454
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/5</td>
                    <td className="border border-gray-300 px-4 py-2">
                      248.0.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      134,217,726
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/6</td>
                    <td className="border border-gray-300 px-4 py-2">
                      252.0.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      67,108,862
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/7</td>
                    <td className="border border-gray-300 px-4 py-2">
                      254.0.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      33,554,430
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border border-gray-300 px-4 py-2 bg-green-50 font-semibold"
                      colSpan={3}
                    >
                      Class A
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/8</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.0.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      16,777,214
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/9</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.128.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      8,388,606
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/10</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.192.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      4,194,302
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/11</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.224.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      2,097,150
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/12</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.240.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      1,048,574
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/13</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.248.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      524,286
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/14</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.252.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      262,142
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/15</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.254.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      131,070
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border border-gray-300 px-4 py-2 bg-blue-50 font-semibold"
                      colSpan={3}
                    >
                      Class B
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/16</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.0.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      65,534
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/17</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.128.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      32,766
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/18</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.192.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      16,382
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/19</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.224.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      8,190
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/20</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.240.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      4,094
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/21</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.248.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      2,046
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/22</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.252.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      1,022
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/23</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.254.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      510
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border border-gray-300 px-4 py-2 bg-purple-50 font-semibold"
                      colSpan={3}
                    >
                      Class C
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/24</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.255.0
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      254
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/25</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.255.128
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      126
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/26</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.255.192
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      62
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/27</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.255.224
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      30
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/28</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.255.240
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      14
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/29</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.255.248
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      6
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/30</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.255.252
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      2
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/31</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.255.254
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      0
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">/32</td>
                    <td className="border border-gray-300 px-4 py-2">
                      255.255.255.255
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      0
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            IPv6 Addressing
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              In IPv6, the network prefix performs a similar function as the
              subnet mask in IPv4, with the prefix length representing the
              number of bits in the address. IPv6 addresses are 128 bits long,
              compared to IPv4's 32 bits, providing a vastly larger address
              space.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">
                IPv6 Address Types
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Global Unicast:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Globally routable addresses</li>
                    <li>Similar to public IPv4 addresses</li>
                    <li>Prefix: 2000::/3</li>
                  </ul>
                </div>
                <div>
                  <strong>Link Local:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Used for local network communication</li>
                    <li>Not routable beyond local link</li>
                    <li>Prefix: fe80::/10</li>
                  </ul>
                </div>
                <div>
                  <strong>Unique Local:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Similar to private IPv4 addresses</li>
                    <li>Routable within organization</li>
                    <li>Prefix: fc00::/7</li>
                  </ul>
                </div>
                <div>
                  <strong>Multicast:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>One-to-many communication</li>
                    <li>Replaces broadcast in IPv4</li>
                    <li>Prefix: ff00::/8</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Practical Subnetting Tips
          </h3>
          <div className="text-gray-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Planning Your Network
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Determine the number of subnets needed</li>
                  <li>Calculate hosts per subnet requirements</li>
                  <li>Choose appropriate subnet mask</li>
                  <li>Plan for future growth</li>
                  <li>Document your addressing scheme</li>
                  <li>Consider VLSM for efficient addressing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Common Subnet Sizes
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>/30 - Point-to-point links (2 hosts)</li>
                  <li>/29 - Small office networks (6 hosts)</li>
                  <li>/28 - Small departments (14 hosts)</li>
                  <li>/27 - Medium departments (30 hosts)</li>
                  <li>/26 - Large departments (62 hosts)</li>
                  <li>/24 - Standard LAN (254 hosts)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Related Calculators
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <a
              href="/percentage"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Percentage Calculator
            </a>
            <a
              href="/time"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Time Calculator
            </a>
            <a
              href="/date"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Date Calculator
            </a>
            <a
              href="/concrete"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Concrete Calculator
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
