const searchBroadCasterCodeHelper = (broadcaster: string) => {
    switch (broadcaster.toLocaleUpperCase()) {
        case 'RPC':
            return 1337
            break
        default:
            throw new Error('BroadCast not Found!')
    }
}

export default searchBroadCasterCodeHelper