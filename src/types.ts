export interface ApiError{
    isError: boolean
    detail: string | undefined    
}

export interface IEdge{
    id: string
    source: string
    target: string
    kid: string
}


export interface INode{
    id: string
    label: string
    kid: string
}
export interface ISkill{
    id: string
    name: string
}
export interface IModule{
    id: string
    name: string
    skills: Array<ISkill>
}
export interface Link{
    url: string
    title: string
}

export interface IModuleDetails extends IModule{
    description: string
    level: string
    links: Array<Link>
}

export interface IPath{
    path: Array<IModule>
}

export interface IRoadmap{ 
    complited: number
    lenght: number
    current_module: string
    path: Array<IModule>
}

export interface UserData{
    email: string
}


export interface LoginResponse{
    access_token: string
    token_type: string
    refresh_token: string
}
