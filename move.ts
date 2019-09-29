import fse from 'fs-extra'

(async () => {
  // await fse.move('dist/share', './share')
  // await fse.move('dist/client', './client')
  // await fse.move('dist/server', './server')
  // console.log('Move success!\n')

  await fse.copyFile('src/lib/type.d.ts', 'dist/lib/type.d.ts');
  await fse.copyFile('src/client/type.d.ts', 'dist/client/type.d.ts');
  await fse.copyFile('src/server/type.d.ts', 'dist/server/type.d.ts');
  console.log(`File copied:
    lib/type.d.ts
    client/type.d.ts
    server/type.d.ts
  `);

  // fse.remove('./dist')
  // console.log('Delete directory dist!')
})();