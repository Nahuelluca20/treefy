import { WorkerKVRateLimit } from "@edgefirst-dev/worker-kv-rate-limit";
import { RATE_LIMITER_OPTIONS } from "./const";

export async function checkRateLimit(
  KV: KVNamespace<string>,
  pathname: string
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const rateLimit = new WorkerKVRateLimit(KV, RATE_LIMITER_OPTIONS);
  const { success } = await rateLimit.limit({ key: pathname });
  if (!success) throw Error("Rate limit exceeded");
}
