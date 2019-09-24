import cpFile from 'cp-file'

(async () => {
  await cpFile('src/share/type.d.ts', 'dist/types/share/type.d.ts');
  await cpFile('src/client/type.d.ts', 'dist/types/client/type.d.ts');
  await cpFile('src/server/type.d.ts', 'dist/types/server/type.d.ts');
  console.log(`File copied:
share/type.d.ts
client/type.d.ts
server/type.d.ts
`);
})();