const globalTimeout = MedisysConfig.setTimeout;

export const sleep = async (timeout = 0) => {
  await new Promise(resolve => globalTimeout(resolve, timeout));
};
