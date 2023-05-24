import React from 'react'
import styled from 'styled-components'
import Quickstat from './Quickstat'
import Graph from './Graph.js'
export default function Dashboard() {
    return (
        <MAIN>
            <Quickstat />
            <Graph />
        </MAIN>
    )
}


const MAIN = styled.div`

`