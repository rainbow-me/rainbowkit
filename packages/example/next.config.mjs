import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

/**
 * @type {import('next').NextConfig}
 */
const config = {}

export default withVanillaExtract(config)
