const fs = Bun.fs();

export const access = fs.access.bind(fs);
export const appendFile = fs.appendFile.bind(fs);
export const close = fs.close.bind(fs);
export const copyFile = fs.copyFile.bind(fs);
export const exists = fs.exists.bind(fs);
export const chown = fs.chown.bind(fs);
export const chmod = fs.chmod.bind(fs);
export const fchmod = fs.fchmod.bind(fs);
export const fchown = fs.fchown.bind(fs);
export const fstat = fs.fstat.bind(fs);
export const fsync = fs.fsync.bind(fs);
export const ftruncate = fs.ftruncate.bind(fs);
export const futimes = fs.futimes.bind(fs);
export const lchmod = fs.lchmod.bind(fs);
export const lchown = fs.lchown.bind(fs);
export const link = fs.link.bind(fs);
export const lstat = fs.lstat.bind(fs);
export const mkdir = fs.mkdir.bind(fs);
export const mkdtemp = fs.mkdtemp.bind(fs);
export const open = fs.open.bind(fs);
export const read = fs.read.bind(fs);
export const write = fs.write.bind(fs);
export const readdir = fs.readdir.bind(fs);
export const readFile = fs.readFile.bind(fs);
export const writeFile = fs.writeFile.bind(fs);
export const readlink = fs.readlink.bind(fs);
export const realpath = fs.realpath.bind(fs);
export const rename = fs.rename.bind(fs);
export const stat = fs.stat.bind(fs);
export const symlink = fs.symlink.bind(fs);
export const truncate = fs.truncate.bind(fs);
export const unlink = fs.unlink.bind(fs);
export const utimes = fs.utimes.bind(fs);
export const lutimes = fs.lutimes.bind(fs);
export const accessSync = fs.accessSync.bind(fs);
export const appendFileSync = fs.appendFileSync.bind(fs);
export const closeSync = fs.closeSync.bind(fs);
export const copyFileSync = fs.copyFileSync.bind(fs);
export const existsSync = fs.existsSync.bind(fs);
export const chownSync = fs.chownSync.bind(fs);
export const chmodSync = fs.chmodSync.bind(fs);
export const fchmodSync = fs.fchmodSync.bind(fs);
export const fchownSync = fs.fchownSync.bind(fs);
export const fstatSync = fs.fstatSync.bind(fs);
export const fsyncSync = fs.fsyncSync.bind(fs);
export const ftruncateSync = fs.ftruncateSync.bind(fs);
export const futimesSync = fs.futimesSync.bind(fs);
export const lchmodSync = fs.lchmodSync.bind(fs);
export const lchownSync = fs.lchownSync.bind(fs);
export const linkSync = fs.linkSync.bind(fs);
export const lstatSync = fs.lstatSync.bind(fs);
export const mkdirSync = fs.mkdirSync.bind(fs);
export const mkdtempSync = fs.mkdtempSync.bind(fs);
export const openSync = fs.openSync.bind(fs);
export const readSync = fs.readSync.bind(fs);
export const writeSync = fs.writeSync.bind(fs);
export const readdirSync = fs.readdirSync.bind(fs);
export const readFileSync = fs.readFileSync.bind(fs);
export const writeFileSync = fs.writeFileSync.bind(fs);
export const readlinkSync = fs.readlinkSync.bind(fs);
export const realpathSync = fs.realpathSync.bind(fs);
export const renameSync = fs.renameSync.bind(fs);
export const statSync = fs.statSync.bind(fs);
export const symlinkSync = fs.symlinkSync.bind(fs);
export const truncateSync = fs.truncateSync.bind(fs);
export const unlinkSync = fs.unlinkSync.bind(fs);
export const utimesSync = fs.utimesSync.bind(fs);
export const lutimesSync = fs.lutimesSync.bind(fs);
export default fs;
realpath.native = realpath;
realpathSync.native = realpathSync;
