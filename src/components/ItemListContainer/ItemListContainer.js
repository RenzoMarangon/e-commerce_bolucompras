import React from 'react'
import CardItem from '../CardItem/CardItem'

const ItemListContainer = () => {
    const objects = [{
        title: "Remera",
        srcImage: "path",
        altImage:"Remera",
        description:"Es una remera"
    }];

  return (
    <main>
        <CardItem props={objects[0]} />
    </main>
  )
}

export default ItemListContainer