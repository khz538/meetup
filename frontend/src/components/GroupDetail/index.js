import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../../store/groups';

export default function GroupDetail() {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const group = useSelector(state => state.groups.group);
    // const user = useSelector(state => state.session.user);
    // console.log('++++++++', group);

    // const isOrganizer = user?.id === group?.organizerId;

    useEffect(() => {
        dispatch(getGroupById(groupId));
    }, [dispatch]);

    if (!group) return null;

    return (
        <div className='group-detail-page'>
            <div className='group-detail-upper'>
                <img src={group.previewImage} alt='group-image' className='group-image'></img>
                <div>
                    <h1>{group.name}</h1>
                    <p>{group.numMembers} member(s)</p>
                    <p>Organizer: {group.Organizer.firstName}</p>
                    <p>{group.city}, {group.state}</p>
                </div>
            </div>
            <div className='group-detail-lower'>
                <div className='group-about-section'>
                    <h3>What we're about</h3>
                    <p>{group.about}</p>
                </div>
            </div>
        </div>
    );
};