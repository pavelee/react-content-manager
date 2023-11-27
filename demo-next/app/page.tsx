import Image from 'next/image'
import { CMComponent, CMProvider } from 'react-content-manager';

export default function Home() {
  return (
    <CMProvider mode={'edit'}>
      <CMComponent configId="main_top" componentId={'container'} mode={'edit'} />
      <CMComponent configId="text-block" componentId={'text-block'} mode={'edit'} />
    </CMProvider>
  )
}
