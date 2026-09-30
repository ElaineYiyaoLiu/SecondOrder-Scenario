/** Static bundles for independent hosting; regular Vercel builds stay supported. */
const staticExport = process.env.SECONDORDER_STATIC_EXPORT === '1';
export default {
  ...(staticExport ? { output: 'export', trailingSlash: true, images: { unoptimized: true } } : {}),
};
