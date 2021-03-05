const globalTimeout = MIConfig.setTimeout;

export const sleep = async (timeout = 0) => {
  await new Promise(resolve => globalTimeout(resolve, timeout));
};
