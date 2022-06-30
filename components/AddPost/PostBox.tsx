import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Avatar from '../Reusable/Avatar'
import LinkIcon from '@heroicons/react/solid/LinkIcon'
import PhotoIcon from '@heroicons/react/solid/PhotographIcon'
import PlusIcon from '@heroicons/react/solid/PlusIcon'
import CheckIcon from '@heroicons/react/solid/CheckIcon'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'
import {
  GET_ALL_POSTS,
  GET_ALL_SUBREDDITS,
  GET_SUBREDDIT_BY_TOPIC,
} from '../../graphql/queries'
import { ADD_POST, ADD_SUBREDDIT } from '../../graphql/mutations'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import client from '../../apollo-client'
import toast, { Toaster } from 'react-hot-toast'
type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: StringOption
}
type Attributes = {
  isOc: boolean
  isSpoiler: boolean
  isNSFW: boolean
}
type User = {
  id: string
  karma: string
  username: string
}

type Subreddit = {
  created_at: Date
  id: string
  members: Array<User>
  title: string
  topic: string
  label: string
}

const filter = createFilterOptions<string>()

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'transparent',
    padding: '0px 20px',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
})
type Subreddits = Array<Subreddit>
type StringOption = string
function PostBox() {
  const { data: session } = useSession()
  // Query to get all subreddits
  const { loading, error, data: subs } = useQuery(GET_ALL_SUBREDDITS)

  // Mutation to insert post
  const [createPost] = useMutation(ADD_POST, {
    refetchQueries: [
      { query: GET_ALL_POSTS }, // DocumentNode object parsed with gql
    ],
  })
  const [createSubreddit] = useMutation(ADD_SUBREDDIT)
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const [atts, setAtts] = useState<Attributes>({
    isOc: false,
    isSpoiler: false,
    isNSFW: false,
  })
  // mapping subreddit data from db to object
  const subreddits: Subreddits =
    subs?.getSubredditList.map((sub: Subreddit) => ({
      ...sub,
      label: sub.title,
    })) || []
  // mapping for option list to autocomplete
  const subredditList = subreddits.map((sub) => sub.id)
  // console.log(subreddits)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      subreddit: '',
    },
  })

  // function to submit data to the mutation
  const onSubmit = async (data: FormData) => {
    const notification = toast.loading('Creating New Post..')
    const { isOc, isSpoiler, isNSFW } = atts
    const postData = { ...data, isOc, isSpoiler, isNSFW }
    const { subreddit } = postData
    try {
      const {
        data: { getSubredditByTopic: subreddits },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: { title: subreddit },
      })
      let subreddit_id
      if (subreddits && subreddits.length > 0) {
        subreddit_id = subreddits[0].id
      } else {
        const {
          data: { insertSubreddit: createdSubreddit },
          errors,
        } = await createSubreddit({
          variables: { title: subreddit },
        })
        if (!errors) {
          console.log(createdSubreddit)
          subreddit_id = createdSubreddit.id
        }
      }
      const {
        data: { insertPosts: newPost },
        errors,
      } = await createPost({
        variables: {
          body: postData.postBody,
          image: postData.postImage || '',
          subreddit_id: subreddit_id,
          title: postData.postTitle,
          isOc: postData.isOc,
          isNSFW: postData.isNSFW,
          isSpoiler: postData.isSpoiler,
          user_id: 1,
        },
      })
      if (!errors) {
        // Sing Success
        console.log('new post added', newPost)
        setValue('postBody', '')
        setValue('postTitle', '')
        setValue('postImage', '')
        setValue('subreddit', '')
        setAtts({ isNSFW: false, isSpoiler: false, isOc: false })
        toast.success('Post Added Successfully!', { id: notification })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Handler functions
  const markNSFW = () => {
    setAtts((atts) => ({ ...atts, isNSFW: !atts.isNSFW }))
  }
  const markOC = () => {
    setAtts((atts) => ({ ...atts, isOc: !atts.isOc }))
  }
  const markSpoiler = () => {
    setAtts((atts) => ({ ...atts, isSpoiler: !atts.isSpoiler }))
  }
  //

  return (
    <form
      className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white md:m-auto md:w-[760px] "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center space-x-3 p-2">
        {/* Avatar */}
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          type="text"
          disabled={!session}
          className="pl- flex-1 rounded-md bg-gray-50 p-2 outline-none"
          placeholder={
            session ? 'Create a post by entering a title.' : 'Sign in to post.'
          }
        />
        <PhotoIcon
          onClick={() => setImageBoxOpen((isOpen) => !isOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300'
          }`}
        />
        <LinkIcon className={`h-6 cursor-pointer text-gray-300`} />
      </div>
      {!!watch('postTitle') && (
        <div className="flex flex-col p-2">
          {/* Body */}
          <div className="flex items-center">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('postBody')}
              type="text"
              placeholder="Text (optional)"
            />
          </div>
          <div className="flex items-center">
            <p className="min-w-[90px]">Choose a community:</p>
            <Autocomplete
              disablePortal
              className="m-2 flex-1 border-0 bg-blue-50 p-2 outline-none"
              options={subredditList}
              loading={loading}
              sx={{ width: 300 }}
              freeSolo
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderInput={(params) => (
                <CssTextField
                  {...register('subreddit', { required: true })}
                  {...params}
                  type="text"
                  placeholder="i.e. reactjs"
                  // size="small"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              getOptionLabel={(option) => {
                const optionLabel = _.get(
                  _.find(subreddits, (sub) => sub.id === option),
                  'label'
                )
                return optionLabel || option
              }}
            />
          </div>
          {imageBoxOpen && (
            <div className="flex items-center">
              <p className="min-w-[90px]">Image Url:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register('postImage')}
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}
          <div className="mb-3 flex flex-1 justify-start space-x-2 border-b-[1px] p-2 pb-4">
            <div>
              <button
                className={`tags ${atts.isOc && 'selected'}`}
                type="button"
                onClick={markOC}
              >
                {atts.isOc ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
                <p>OC</p>
              </button>
            </div>
            <div>
              <button
                className={`tags ${atts.isSpoiler && 'selected'}`}
                type="button"
                onClick={markSpoiler}
              >
                {atts.isSpoiler ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}{' '}
                <p>Spoiler</p>
              </button>
            </div>
            <div>
              <button
                className={`tags ${atts.isNSFW && 'selected'}`}
                type="button"
                onClick={markNSFW}
              >
                {atts.isNSFW ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}{' '}
                <p>NSFW</p>
              </button>
            </div>
          </div>

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="text-red-600">
              {errors.postTitle?.type === 'required' && (
                <p>A post title is required</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p>- A subreddit is required</p>
              )}
            </div>
          )}
          {!!watch('postTitle') && (
            <div className="mr-2 flex flex-1 justify-end pr-1">
              <button
                type="submit"
                className="w-16 justify-end rounded-3xl bg-[#014980] px-2 py-1 text-white"
              >
                Post
              </button>
            </div>
          )}
        </div>
      )}
      <Toaster />
    </form>
  )
}

export default PostBox
