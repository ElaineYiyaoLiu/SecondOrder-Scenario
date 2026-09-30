// Work around container environments without readable process memory statistics.
const original = process.memoryUsage;
process.memoryUsage = function safeMemoryUsage() {
  try { return original(); }
  catch (error) {
    if (error && error.code === 'ENOENT') return { rss: 0, heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 };
    throw error;
  }
};
process.memoryUsage.rss = () => { try { return original.rss(); } catch { return 0; } };
const os = require('node:os');
const interfaces = os.networkInterfaces;
os.networkInterfaces = function safeNetworkInterfaces() {
  try { return interfaces(); }
  catch (error) {
    if (error && error.code === 'ERR_SYSTEM_ERROR') return { lo: [{ address: '127.0.0.1', family: 'IPv4', internal: true, netmask: '255.0.0.0', cidr: '127.0.0.1/8', mac: '00:00:00:00:00:00' }] };
    throw error;
  }
};
