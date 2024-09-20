import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { icons } from 'lucide-react';
import { iconList } from '@/constants/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IconList({selectedIcon}) {

    const BASE_URL = "https://logoexpress.tubeguruji.com";
    const [open,setOpen] = useState(false);
    const [colorIcons,setColorIcons] = useState([]);


    const storageValue = (() => {
        const storedValue = localStorage.getItem('value');
        if (storedValue) {
            try {
                return JSON.parse(storedValue);
            } catch (error) {
                console.error('Error parsing JSON from localStorage:', error);
                return {};
            }
        }
        return {};
    })();

    const [icon, setIcon] = useState(storageValue.icon || 'Smile');

    const Icon = ({ name, color, size }) => {
        const LucidIcon = icons[name];
        if (!LucidIcon) {
            return null;
        }
        return (
            <LucidIcon
                color={color}
                size={size}
            />
        );
    };

    async function getColorIcons(){
        const response = await fetch(`${BASE_URL}/getIcons.php`);
        const data = await response.json();
        setColorIcons(data);
    }

    useEffect(()=>{
        getColorIcons();
    },[])

    return (
        <div>
            <div>
                <label>Icon</label>
                <div onClick={()=> setOpen(true)} className='p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex justify-center items-center my-2'>
                    {
                        icon.includes(".png") ? <img src={BASE_URL+"/png/"+icon} alt="" /> :   <Icon name={icon} color={"#000"} size={22}/>
                    }
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle >Pic Your Favourite Icon</DialogTitle>
                        <DialogDescription>

                        <Tabs defaultValue="icon" className="w-[400px] mt-2">
                        <TabsList>
                            <TabsTrigger value="icon">Icons</TabsTrigger>
                            <TabsTrigger value="color-icon">Color Icons</TabsTrigger>
                        </TabsList>
                        <TabsContent value="icon"> <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-scroll h-[400px] p-6'>
                            {
                                iconList.map((icon,index)=>{
                                  return <div onClick={()=> {selectedIcon(icon) ;setOpen(false);setIcon(icon)}} key={index} className='border p-3 rounded-sm flex items-center justify-center cursor-pointer'>
                                        <Icon name={icon} color={"#000"} size={20}/>
                                    </div>
                                })
                            }
                           </div></TabsContent>
                        <TabsContent value="color-icon">
                            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-scroll h-[400px] p-6'>
                            {
                                colorIcons.map((icon,index)=>{
                                  return <div onClick={()=> {selectedIcon(icon) ;setOpen(false);setIcon(icon)}} key={index} className='border p-3 rounded-sm flex items-center justify-center cursor-pointer'>
                                       <img src={BASE_URL+"/png/"+icon}/>
                                    </div>
                                })
                            }
                           </div>
                        </TabsContent>
                        </Tabs>


                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
