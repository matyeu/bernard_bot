import chalk from 'chalk';
import dayjs from 'dayjs'

const format = '{tstamp} {tag} - {text}\n';

export function error(content: string) {
    write(content, 'black', 'bgRed', 'ERROR', true)
}

export function warn(content: string) {
    write(content, 'black', 'bgYellow', 'WARN', false)
}

export function command(content: string) {
    write(content, 'black', 'bgMagenta', 'CMD', false)
}

export function event(content: string) {
    write(content, 'black', 'bgGreen', 'EVT', false)
}

export function client(content: string) {
    write(content, 'black', 'bgBlue', 'CLIENT', false)
}

export function dashboard(content: string) {
    write(content, 'black', 'bgCyan', 'DASHB', false)
}

export function modules(content: string) {
    write(content, 'black', 'bgWhite', 'MODULE', false)
}

function write(content: string, tagColor: string, bgTagColor: string, tag: string, error = false) {
    const timestamp = `[${dayjs().format('DD/MM - HH:mm:ss')}]`;
    const logTag = `[${tag}]`;
    const stream = error ? process.stderr : process.stdout

    const item = format
        .replace(`{tstamp}`, chalk.gray(timestamp))
        // @ts-ignore
        .replace('{tag}', chalk[bgTagColor][tagColor](logTag))
        .replace(`{text}`, chalk.white(content))

    stream.write(item)
};