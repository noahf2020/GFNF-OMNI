import React from 'react'
import styled from 'styled-components'
import { Bar, Line } from "react-chartjs-2";
export default function Graph() {

const chartData = {    
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
        {
          label: 'Checkouts',
          data: [10,20,3,6,15,15,10,20,15],
          // you can set indiviual colors for each bar
          borderColor:"#57267a",
        color: "#463dad",

          backgroundColor: [
            "#57267a",
       
          ],
          borderWidth: 2,
          hoverOffset: 4
        }
    ]
}

    return (
        <MainDIV>
      
          <Line
        data={chartData}
        options={{
            responsive: true,
            scales: {
                y: {
                  grid: {
                    color: '#201d2b'
                  },
                  ticks: {
                    color: "#979699", // this here
                    // this here
                  },
                },
                x: {
                  grid: {
                    color: ''
                  },
                  ticks: {
                    color: "#979699", // this here
                  },
                }
              },
            
            plugins: {
                color: "green",
              legend: {
                position: 'top',
              },
              title: {
                display: true,
              
              }
            }
        }}
      />
        
        </MainDIV>
    )
}



const MainDIV = styled.div`
height:30px;
width:680px;
margin-left:240px;

background-color:#1e1a2b
;
border-radius:5px;

`