import SpotlightOverlay from '@/components/common/transition/SpotlightOverlay'
import Amenities from '@/components/website/micro/Amenities'
import Construction from '@/components/website/micro/Construction'
import FAQ from '@/components/website/micro/FAQ'
import FloorPlans from '@/components/website/micro/FloorPlans'
import Footer from '@/components/website/micro/Footer'
import Gallery from '@/components/website/micro/Gallery'
import Hero from '@/components/website/micro/Hero'
import Highlights from '@/components/website/micro/Highlights'
import LocationMap from '@/components/website/micro/LocationMap'
import Overview from '@/components/website/micro/Overview'
import Walkthrough from '@/components/website/micro/Walkthrough'
import React from 'react'

const page = () => {
  return (
    <>
    <Hero/>
    <Overview/>
    <Gallery/>
    <Amenities/>
    <Walkthrough/>
    {/* <Highlights/> */}
    <FloorPlans/>
    <LocationMap/>
    <Construction/>
    <FAQ/>
    {/* <Footer/> */}
      
    </>
  )
}

export default page
