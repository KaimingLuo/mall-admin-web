import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALPRVyjG2mHaIuGKVywVhVRwi3PhOjlG\n' +
  'Eugo/G9d/3q9rQBJ4eeigFC0a7NTfTjnGuzmhiFApzq1sHaLJljzLccCAwEAAQ==';

const privateKey = 'MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAs9FXKMbaYdoi4YpX\n' +
  'LBWFVHCLc+E6OUYS6Cj8b13/er2tAEnh56KAULRrs1N9OOca7OaGIUCnOrWwdosm\n' +
  'WPMtxwIDAQABAkEAhk//gn3F8QE2vLDQnCUXChNmlo/NJaqpxK+YnrbfdZWnI6Ap\n' +
  'Q1g52NTzbzkjxKB6MZsnMWtKnUXAxF62+ztyAQIhAOBiZJew69eK8RPBaX8tdpEQ\n' +
  'PBD1y4jSFAtlxYCtHdFnAiEAzSdqzsbKwXNkehqY8ErCKyHgwgAPRESmVzze8OJA\n' +
  'JKECIARcpUv1moAUKV+S8PQR9C4ZvLEvtgcw3kbicZZwxxWdAiAPVrchprNaK2qD\n' +
  'xqFQtgY2e132o1KA5DEbrK1ujTwGgQIhAJz91gE38iGLnsVDuWgbuH8FyQQ4Cmwn\n' +
  'NJ1Mz0a4EzVc';

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}

