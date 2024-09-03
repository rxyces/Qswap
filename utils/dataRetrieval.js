import { supabase } from "../lib/supabase"

export const getRecordsByCategory = async ({ category }) => {
    const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select('id')
    .eq("name", category)
    
    if (!categoryError) {
        const categoryId = categoryData[0]?.id; 

        if (categoryId) {
            const { data: eventCategoriesData, error: eventsCategoriesError } = await supabase
                .from('event_categories')
                .select("events(*)")
                .eq('category_id', categoryId);
            if (!eventsCategoriesError) {
                const eventData = eventCategoriesData.map(item => item.events)
                return {data: eventData, error: null}
            }
            else {
                return {data: null, error: eventsCategoriesError}
            }
        } 
        else {
            console.error("Category id dosent exist")
            return {data: null, error: "Category id not found"}
        }
    }
    else {
        return {data: null, error: categoryError}
    }
}

export const getRecordsByID = async ({id}) => {
    const { data: eventData, error: eventsError } = await supabase
    .from("events")
    .select('*')
    .eq('id', id)
    
    if (eventsError) {
        console.error(JSON.stringify(eventsError))
        return {data: null, error: "Failed fetching events, reload"}
    } 
    else {
        return {data: eventData, error: null}
    }
}

export const getTicketAsksByEventID = async (id) => {
    const { data: ticketData, error: ticketError } = await supabase
    .from("ticket_types")
    .select(`
        *,
        user_asks(*),
        user_offers(*)
        `)
    .eq("id", id)
    
    if (ticketError) {
        console.error(JSON.stringify(eventsError))
        return {data: null, error: "Failed fetching tickets, reload"}
    } 
    else {
        return {data: ticketData, error: null}
    }
}

export const getTicketTypeByEventID = async (id) => {
    const { data: ticketData, error: ticketError } = await supabase
    .from("ticket_types")
    .select("*")
    .eq("event_id", id)
    
    if (ticketError) {
        console.error(JSON.stringify(eventsError))
        return {data: null, error: "Failed fetching ticket types, reload"}
    } 
    else {
        return {data: ticketData, error: null}
    }
}