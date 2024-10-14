const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB
const THREAD_COUNT = navigator.hardwareConcurrency || 4;

export function cutFile(file) {
  return new Promise((resolve) => {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
    const result = [];
    let finishCount = 0;
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 分配线程任务
      const worker = new Worker('./worker.js', {
        type: 'module',
      });
      const start = i * threadChunkCount;
      let end = (i + 1) * threadChunkCount;
      if (end > chunkCount) {
        end = chunkCount;
      }
      worker.postMessage({
        file,
        start,
        end,
        CHUNK_SIZE,
      });
      worker.onmessage = (e) => {
        result[i] = e.data;
        worker.terminate();
        finishCount++;
        if (finishCount === THREAD_COUNT) {
          resolve(result.flat());
        }
      };
    }
  });
}
