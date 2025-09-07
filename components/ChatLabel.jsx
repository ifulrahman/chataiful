import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ChatLabel = ({openMenu, setOpenMenu, id, name}) => {
  const {fetchUsersChats, chats, setSelectedChat} = useAppContext();

  // --- NEW: state untuk modal ---
  const [modal, setModal] = useState({ open: false, type: null }); // type: 'rename' | 'delete'
  const [newName, setNewName] = useState(name || '');

  const selectChat = () => {
    const chatData = chats.find((chat) => chat._id === id)
    setSelectedChat(chatData)
  }

  // --- OPEN modal helpers ---
  const openRename = (e) => {
    e.stopPropagation();
    setOpenMenu({ id: 0, open: false });
    setNewName(name || '');
    setModal({ open: true, type: 'rename' });
  };

  const openDelete = (e) => {
    e.stopPropagation();
    setOpenMenu({ id: 0, open: false });
    setModal({ open: true, type: 'delete' });
  };

  const closeModal = () => setModal({ open: false, type: null });

  const renameHandler = async (val) => {
    try {
      const finalName = (val ?? newName)?.trim();
      if (!finalName || finalName === name) return closeModal();

      const {data} = await axios.post('/api/chat/rename', { chatId: id, name: finalName });
      if (data.success) {
        await fetchUsersChats();
        toast.success(data.message || 'Chat Renamed');
        closeModal();
      } else {
        toast.error(data.message || data.error || 'Rename failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.response?.data?.error || error.message);
    }
  }

  const deleteHandler = async () => {
    try {
      const { data } = await axios.post('/api/chat/delete', { chatId: id });
      if (data.success) {
        await fetchUsersChats();
        toast.success(data.message || 'Chat Deleted');
        closeModal();
      } else {
        toast.error(data.message || data.error || 'Delete failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.response?.data?.error || error.message);
    }
  }

  return (
    <>
      {/* ROW ITEM */}
      <div
        onClick={selectChat}
        className='flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer'
      >
        <p className='group-hover:max-5.6 truncate'>{name}</p>

        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu({
              id,
              open: openMenu.id === id ? !openMenu.open : true,
            });
          }}
          className='group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg'
        >
          <Image
            src={assets.three_dots}
            alt=''
            className={`w-4 ${openMenu.id === id && openMenu.open ? '' : 'hidden'} group-hover:block`}
          />

          {/* MENU PANEL */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute ${openMenu.id === id && openMenu.open ? 'block' : 'hidden'}
            -right-36 top-6 bg-[#2b2b2f] rounded-xl w-max p-2 border border-white/10 shadow-xl`}
          >
            <div
              onClick={openRename}
              className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg'
            >
              <Image src={assets.pencil_icon} alt='' className='w-4' />
              <p>Rename</p>
            </div>
            <div
              onClick={openDelete}
              className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg'
            >
              <Image src={assets.delete_icon} alt='' className='w-4' />
              <p>Delete</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL + BACKDROP BLUR */}
      {modal.open && (
        <div className='fixed inset-0 z-[100]'>
          {/* backdrop */}
          <div
            className='absolute inset-0 bg-black/30 backdrop-blur-xs'
            onClick={closeModal}
          />
          {/* dialog */}
          <div className='absolute inset-0 flex items-center justify-center p-4'>
            <div className='w-full max-w-md rounded-2xl bg-[#2b2b2f] border border-white/10 p-5 shadow-2xl'
                 onClick={(e)=>e.stopPropagation()}>
              {modal.type === 'rename' ? (
                <>
                  <h3 className='text-white font-semibold mb-3'>Rename chat</h3>
                  <input
                    autoFocus
                    value={newName}
                    onChange={(e)=>setNewName(e.target.value)}
                    className='w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none'
                    placeholder='Enter new name'
                  />
                  <div className='flex justify-end gap-2 mt-4'>
                    <button
                      onClick={closeModal}
                      className='px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 cursor-pointer'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={()=>renameHandler(newName)}
                      className='px-3 py-1.5 rounded-lg bg-primary text-white hover:opacity-90 cursor-pointer'
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className='text-white font-semibold mb-3'>Delete chat</h3>
                  <p className='text-white/70'>Are you sure you want to delete <span className='font-medium text-white'>{name}</span>?</p>
                  <div className='flex justify-end gap-2 mt-4'>
                    <button
                      onClick={closeModal}
                      className='px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 cursor-pointer'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteHandler}
                      className='px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer'
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatLabel
