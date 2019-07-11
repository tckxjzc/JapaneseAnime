export function isNotInt(id){
    return /\D/.test(id)||parseInt(id)<1||parseInt(id)>300
}
