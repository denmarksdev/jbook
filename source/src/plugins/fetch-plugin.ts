import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage'

const fileCache = localForage.createInstance({
    name: 'filecache'
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: inputCode,
                    };
                }

                // Check to seer if we have already fetched this file
                // and if it is n the cache

                // const cahcheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                // // if it is, reutrn it immediately
                // if (cahcheResult) {
                //     return cahcheResult;
                // }

                const { data, request } = await axios.get(args.path);

                const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'")

                const contents =
                    fileType === 'css'
                        ? `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                 `     : data;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: contents,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                // store response cache
                await fileCache.setItem(args.path, result);

                return result;
            });
        }
    }
}